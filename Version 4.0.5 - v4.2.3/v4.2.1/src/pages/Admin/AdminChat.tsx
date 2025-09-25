import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { MessageCircle, Send, Paperclip, Download, X, Image, File, Trash2, Smile, ImageIcon, Users, Mic, Video } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAdminAuth } from '@/contexts/AdminAuthContext';

interface ChatMessage {
  id: string;
  maintainer_id: string;
  maintainer_username: string;
  message_type: 'text' | 'file' | 'image';
  content?: string;
  file_url?: string;
  file_name?: string;
  file_size?: number;
  file_type?: string;
  created_at: string;
  is_deleted: boolean;
}

interface OnlineUser {
  user_id: string;
  username: string;
  display_name: string;
  last_seen: string;
}

interface PresenceState {
  [key: string]: OnlineUser[];
}

const AdminChat = () => {
  const { user, hasPermission, logActivity } = useAdminAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
  const [allUsers, setAllUsers] = useState<OnlineUser[]>([]);
  const [showGifPicker, setShowGifPicker] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const presenceChannelRef = useRef<any>(null);

  // Any authenticated admin user can access chat
  const hasChatAccess = !!user;

  useEffect(() => {
    if (hasChatAccess) {
      loadMessages();
      loadAllUsers();
      setupPresenceTracking();
      const cleanup = subscribeToMessages();
      return () => {
        cleanup();
        if (presenceChannelRef.current) {
          supabase.removeChannel(presenceChannelRef.current);
        }
      };
    }
  }, [hasChatAccess]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  };

  const loadMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_chat_messages')
        .select('*')
        .eq('is_deleted', false)
        .order('created_at', { ascending: true })
        .limit(100);

      if (error) throw error;
      setMessages((data || []).map(msg => ({
        ...msg,
        message_type: msg.message_type as 'text' | 'file' | 'image'
      })));
    } catch (error) {
      console.error('Error loading messages:', error);
      toast.error('Failed to load chat messages');
    }
  };

  const loadAllUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('maintainer_users')
        .select('id, username, display_name')
        .eq('is_active', true);

      if (error) throw error;
      
      const usersWithPresence = (data || []).map(u => ({
        user_id: u.id,
        username: u.username,
        display_name: u.display_name || u.username,
        last_seen: new Date().toISOString()
      }));

      // Add legacy Maintainer user
      usersWithPresence.push({
        user_id: 'legacy-maintainer',
        username: 'Maintainer',
        display_name: 'Main Administrator',
        last_seen: new Date().toISOString()
      });

      setAllUsers(usersWithPresence);
    } catch (error) {
      console.error('Error loading users:', error);
    }
  };

  const setupPresenceTracking = () => {
    if (!user) return;

    const channel = supabase.channel('admin-chat-presence');
    presenceChannelRef.current = channel;

    const userPresence = {
      user_id: user.id || 'legacy-maintainer',
      username: user.username,
      display_name: user.display_name || user.username,
      last_seen: new Date().toISOString()
    };

    channel
      .on('presence', { event: 'sync' }, () => {
        const presenceState = channel.presenceState() as PresenceState;
        const online = Object.values(presenceState).flat();
        setOnlineUsers(online);
      })
      .on('presence', { event: 'join' }, ({ newPresences }) => {
        console.log('User joined:', newPresences);
      })
      .on('presence', { event: 'leave' }, ({ leftPresences }) => {
        console.log('User left:', leftPresences);
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await channel.track(userPresence);
        }
      });
  };

  const subscribeToMessages = () => {
    const channel = supabase
      .channel('admin-chat-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'admin_chat_messages',
          filter: 'is_deleted=eq.false'
        },
        (payload) => {
          const newMessage = payload.new as ChatMessage;
          setMessages(prev => [...prev, {
            ...newMessage,
            message_type: newMessage.message_type as 'text' | 'file' | 'image'
          }]);
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'admin_chat_messages'
        },
        (payload) => {
          const updatedMessage = payload.new as ChatMessage;
          setMessages(prev => 
            prev.map(msg => 
              msg.id === updatedMessage.id ? {
                ...updatedMessage,
                message_type: updatedMessage.message_type as 'text' | 'file' | 'image'
              } : msg
            ).filter(msg => !msg.is_deleted)
          );
        }
      )
      .subscribe((status) => {
        console.log('Chat subscription status:', status);
      });

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !user) return;

    // Generate a UUID for legacy users who don't have an ID
    const maintainerId = user.id || crypto.randomUUID();

    try {
      setLoading(true);
      
      // Check if message contains image/gif URLs
      const urlRegex = /(https?:\/\/[^\s]+\.(jpg|jpeg|png|gif|webp))/gi;
      const hasImageUrls = urlRegex.test(newMessage.trim());
      
      const { error } = await supabase
        .from('admin_chat_messages')
        .insert([{
          maintainer_id: maintainerId,
          maintainer_username: user.username,
          message_type: hasImageUrls ? 'image' : 'text',
          content: newMessage.trim(),
          file_url: hasImageUrls ? newMessage.trim().match(urlRegex)?.[0] : undefined
        }]);

      if (error) throw error;

      await logActivity('chat_message', 'Sent chat message', {
        message_preview: newMessage.trim().substring(0, 50)
      });

      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size must be less than 10MB');
      return;
    }

    try {
      setUploading(true);
      
      // Generate a UUID for legacy users who don't have an ID
      const maintainerId = user.id || crypto.randomUUID();
      
      // Upload file to Supabase storage
      const fileName = `${Date.now()}_${file.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('admin-chat-files')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('admin-chat-files')
        .getPublicUrl(fileName);

      // Determine message type
      const messageType = file.type.startsWith('image/') ? 'image' : 'file';

      // Save message to database
      const { error } = await supabase
        .from('admin_chat_messages')
        .insert([{
          maintainer_id: maintainerId,
          maintainer_username: user.username,
          message_type: messageType,
          file_url: publicUrl,
          file_name: file.name,
          file_size: file.size,
          file_type: file.type
        }]);

      if (error) throw error;

      await logActivity('chat_file_upload', 'Uploaded file to chat', {
        file_name: file.name,
        file_size: file.size,
        file_type: file.type
      });

      toast.success('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Failed to upload file');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
    }
  };

  const deleteMessage = async (messageId: string, messageOwnerId: string) => {
    if (!user) return;

    // Check if user can delete this message
    const canDelete = user.username === 'Maintainer' || messageOwnerId === (user.id || crypto.randomUUID());
    
    if (!canDelete) {
      toast.error('You can only delete your own messages');
      return;
    }

    try {
      const { error } = await supabase
        .from('admin_chat_messages')
        .update({ is_deleted: true })
        .eq('id', messageId);

      if (error) throw error;

      await logActivity('chat_message_delete', 'Deleted chat message', {
        message_id: messageId
      });

      toast.success('Message deleted');
    } catch (error) {
      console.error('Error deleting message:', error);
      toast.error('Failed to delete message');
    }
  };

  const clearAllMessages = async () => {
    if (!user || user.username !== 'Maintainer') {
      toast.error('Only Maintainer can clear all messages');
      return;
    }

    try {
      const { error } = await supabase
        .from('admin_chat_messages')
        .update({ is_deleted: true })
        .eq('is_deleted', false);

      if (error) throw error;

      await logActivity('chat_clear_all', 'Cleared all chat messages');
      toast.success('All messages cleared');
    } catch (error) {
      console.error('Error clearing messages:', error);
      toast.error('Failed to clear messages');
    }
  };

  const renderMessage = (message: ChatMessage) => {
    const isOwnMessage = message.maintainer_username === user?.username;
    const canDelete = user?.username === 'Maintainer' || isOwnMessage;
    
    return (
      <div
        key={message.id}
        className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-4 group`}
      >
        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl relative ${
          isOwnMessage 
            ? 'bg-primary text-primary-foreground' 
            : 'bg-muted'
        }`}>
          {!isOwnMessage && (
            <div className="text-xs font-medium mb-1 text-muted-foreground">
              {message.maintainer_username}
            </div>
          )}
          
          {message.message_type === 'text' && (
            <div className="break-words whitespace-pre-wrap">{message.content}</div>
          )}
          
          {message.message_type === 'image' && (
            <div className="space-y-2">
              {/* Display image from URL or uploaded file */}
              <img 
                src={message.file_url || message.content?.match(/(https?:\/\/[^\s]+\.(jpg|jpeg|png|gif|webp))/i)?.[0]} 
                alt={message.file_name || "Shared image"}
                className="max-w-full max-h-64 h-auto rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                loading="lazy"
                onClick={() => {
                  const imageUrl = message.file_url || message.content?.match(/(https?:\/\/[^\s]+\.(jpg|jpeg|png|gif|webp))/i)?.[0];
                  if (imageUrl) window.open(imageUrl, '_blank');
                }}
              />
              {/* Show any additional text content */}
              {message.content && !message.file_url && (
                <div className="break-words whitespace-pre-wrap text-sm">
                  {message.content.replace(/(https?:\/\/[^\s]+\.(jpg|jpeg|png|gif|webp))/gi, '').trim()}
                </div>
              )}
              {message.file_name && (
                <div className="flex items-center gap-2 text-xs opacity-75">
                  <Image size={12} />
                  <span>{message.file_name}</span>
                  {message.file_url && (
                    <a 
                      href={message.file_url} 
                      download={message.file_name}
                      className="hover:underline"
                    >
                      <Download size={12} />
                    </a>
                  )}
                </div>
              )}
            </div>
          )}
          
          {message.message_type === 'file' && (
            <div className="flex items-center gap-3 p-3 border rounded-lg bg-background/50">
              <File size={20} />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm truncate">{message.file_name}</div>
                <div className="text-xs text-muted-foreground">
                  {message.file_size && formatFileSize(message.file_size)}
                </div>
              </div>
              <a 
                href={message.file_url} 
                download={message.file_name}
                className="p-1 hover:bg-background/50 rounded"
              >
                <Download size={16} />
              </a>
            </div>
          )}
          
          <div className={`text-xs mt-1 ${
            isOwnMessage ? 'text-primary-foreground/70' : 'text-muted-foreground'
          }`}>
            {formatTime(message.created_at)}
          </div>

          {canDelete && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute -top-2 -right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity bg-destructive hover:bg-destructive/80 text-destructive-foreground"
              onClick={() => deleteMessage(message.id, message.maintainer_id)}
            >
              <Trash2 size={12} />
            </Button>
          )}
        </div>
      </div>
    );
  };

  const insertGif = (gifUrl: string) => {
    setNewMessage(prev => prev + ` ![gif](${gifUrl}) `);
    setShowGifPicker(false);
  };

  const insertEmoji = (emoji: string) => {
    setNewMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  const isUserOnline = (userId: string) => {
    return onlineUsers.some(u => u.user_id === userId);
  };

  const getUsersListDisplay = () => {
    return allUsers.map(user => ({
      ...user,
      isOnline: isUserOnline(user.user_id)
    }));
  };

  // Group messages by date
  const groupedMessages = messages.reduce((groups, message) => {
    const date = formatDate(message.created_at);
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
    return groups;
  }, {} as Record<string, ChatMessage[]>);

  if (!hasChatAccess) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Admin Chat Room
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="text-muted-foreground mb-2">Not Authenticated</div>
            <p className="text-sm">You must be logged in to access the admin chat room.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-4 h-[700px]">
      {/* Users List */}
      <Card className="col-span-1">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4" />
            Online Users
            <Badge variant="secondary" className="text-xs">
              {onlineUsers.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[580px] px-3">
            <div className="space-y-2">
              {getUsersListDisplay().map((user) => (
                <div
                  key={user.user_id}
                  className={`flex items-center gap-2 p-2 rounded-md transition-all ${
                    user.isOnline 
                      ? 'bg-primary/10 text-foreground' 
                      : 'bg-muted/50 text-muted-foreground opacity-60'
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full ${
                    user.isOnline ? 'bg-green-500' : 'bg-gray-400'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">
                      {user.display_name}
                    </div>
                    <div className="text-xs truncate">
                      @{user.username}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Chat Area */}
      <Card className="col-span-3 flex flex-col">
        <CardHeader className="flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Admin Chat Room
              <Badge variant="secondary">
                {messages.length} messages
              </Badge>
            </div>
            {user?.username === 'Maintainer' && (
              <Button
                variant="destructive"
                size="sm"
                onClick={clearAllMessages}
                className="text-xs"
              >
                <Trash2 className="h-3 w-3 mr-1" />
                Clear All
              </Button>
            )}
          </div>
        </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
        {/* Messages Area - Fixed height container with scrolling */}
        <div className="h-[400px] overflow-hidden">
          <ScrollArea className="h-full px-4" type="always">
            <div className="space-y-4 py-4">
              {Object.entries(groupedMessages).map(([date, dayMessages]) => (
                <div key={date}>
                  <div className="flex items-center justify-center my-4">
                    <Badge variant="outline" className="text-xs">
                      {date}
                    </Badge>
                  </div>
                  {dayMessages.map(renderMessage)}
                </div>
              ))}
              {messages.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No messages yet. Start the conversation!
                </div>
              )}
              <div ref={messagesEndRef} className="h-1" />
            </div>
          </ScrollArea>
        </div>
        
        {/* Input Area - Fixed at bottom */}
        <div className="border-t p-4 flex-shrink-0 space-y-3">
          {/* Main Input Row */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="shrink-0"
            >
              <Paperclip className="h-4 w-4" />
            </Button>
            
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              disabled={loading}
              className="flex-1"
            />
            
            <Button
              onClick={sendMessage}
              disabled={loading || !newMessage.trim()}
              size="sm"
              className="shrink-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>

          {/* Enhanced Features Row */}
          <div className="flex items-center gap-2">
            <Popover open={showEmojiPicker} onOpenChange={setShowEmojiPicker}>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Smile className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="grid grid-cols-8 gap-2 p-2">
                  {['😀', '😃', '😄', '😁', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩', '🥳', '😏', '😒'].map((emoji) => (
                    <Button
                      key={emoji}
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => insertEmoji(emoji)}
                    >
                      {emoji}
                    </Button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>

            <Popover open={showGifPicker} onOpenChange={setShowGifPicker}>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="sm">
                  <ImageIcon className="h-4 w-4" />
                  GIF
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="p-2">
                  <p className="text-sm text-muted-foreground mb-2">Popular GIFs</p>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      'https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif',
                      'https://media.giphy.com/media/26FLdmIp6wJr91JAI/giphy.gif',
                      'https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif',
                      'https://media.giphy.com/media/l3q2XhfQ8oCkm1Ts4/giphy.gif'
                    ].map((gif, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        className="h-20 w-full p-1"
                        onClick={() => insertGif(gif)}
                      >
                        <img 
                          src={gif} 
                          alt={`GIF ${index + 1}`}
                          className="w-full h-full object-cover rounded"
                        />
                      </Button>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <Separator orientation="vertical" className="h-6" />

            <Button variant="ghost" size="sm" disabled>
              <Mic className="h-4 w-4" />
            </Button>

            <Button variant="ghost" size="sm" disabled>
              <Video className="h-4 w-4" />
            </Button>

            <div className="flex-1" />

            <div className="text-xs text-muted-foreground">
              {onlineUsers.length} online
            </div>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileUpload}
            className="hidden"
            accept="image/*,.pdf,.doc,.docx,.txt,.zip,.rar"
          />
          
          {uploading && (
            <div className="text-xs text-muted-foreground mt-2">
              Uploading file...
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  </div>
);
};

export default AdminChat;