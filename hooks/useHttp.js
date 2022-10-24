import { useState } from "react";

function useHttp() {
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState(null);

  const closeErrorMessage = () => {
    setHttpError(null);
  };

  const sendRequest = async (requestConfig, dataProcessingLogic) => {
    setIsLoading(true);
    setHttpError(null);

    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });

      if (!response.ok) {
        const errorInfo = await response.json();
        throw new Error(errorInfo.errorMessage);
      }

      const data = await response.json();
      dataProcessingLogic(data);
    } catch (error) {
      setIsLoading(false);
      setHttpError(error.message);
    }
  };

  return {
    httpError,
    setHttpError,
    closeErrorMessage,
    setIsLoading,
    isLoading,
    sendRequest,
  };
}

export default useHttp;
