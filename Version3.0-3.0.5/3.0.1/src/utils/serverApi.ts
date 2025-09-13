
/**
 * Utility functions for fetching FiveM server data
 */

export interface FiveMServerResponse {
  Data: {
    clients: number;
    sv_maxclients: number;
    hostname: string;
    icon?: string;
    resources?: string[];
    server: string;
    vars: {
      banner_connecting?: string;
      banner_detail?: string;
      locale?: string;
      onesync_enabled?: string;
      tags?: string;
      [key: string]: string | undefined;
    };
  };
}

/**
 * Fetches server data from the FiveM API
 * @param connectionCode The server connection code (without the leading slash)
 * @returns Promise with the server data or null if not found/error
 */
export const fetchServerData = async (connectionCode: string): Promise<FiveMServerResponse | null> => {
  // Clean the connection code (remove leading slash if present)
  const cleanCode = connectionCode.startsWith('/') ? connectionCode.substring(1) : connectionCode;
  
  if (!cleanCode || cleanCode === 'N/a') {
    return null;
  }
  
  try {
    const response = await fetch(`https://servers-frontend.fivem.net/api/servers/single/${cleanCode}`);
    
    if (!response.ok) {
      console.error(`Failed to fetch server data: ${response.status}`);
      return null;
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching server data:', error);
    return null;
  }
};

/**
 * Get a proper server banner URL from the FiveM API response
 * @param serverData The server data from the API
 * @returns The banner URL or null if not available
 */
export const getServerBannerUrl = (serverData: FiveMServerResponse | null): string | null => {
  if (!serverData) return null;
  
  // Check for banner in vars
  const bannerDetail = serverData.Data.vars.banner_detail;
  const bannerConnecting = serverData.Data.vars.banner_connecting;
  
  // Return the first available banner or null if none exists
  if (bannerDetail) {
    console.log("Found banner_detail:", bannerDetail);
    return bannerDetail;
  } else if (bannerConnecting) {
    console.log("Found banner_connecting:", bannerConnecting);
    return bannerConnecting;
  }
  
  return null;
};
