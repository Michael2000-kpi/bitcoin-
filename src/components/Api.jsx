import React, { useState, useEffect, useRef, useCallback } from "react";
import "./Api.css"; // Make sure to import the CSS file

const Api = () => {
  const [data, setData] = useState([]); // State to store fetched data
  const [page, setPage] = useState(1); // State to track the current page
  const [isLoading, setIsLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State to track errors
  const observer = useRef(); // Ref to observe the last element in the list

  const limit = 40; // Fetch 40 items per request

  // Function to fetch data from the API
  const fetchData = useCallback(async () => {
    setIsLoading(true); // Set loading to true
    try {
      const response = await fetch(
        `https://api-eu.okotoki.com/coins?page=${page}&limit=${limit}`
      ); // Fetch data from API
      if (!response.ok) {
        throw new Error(`An error occurred: ${response.status}`);
      }
      const result = await response.json(); // Parse response
      setData((prevData) => [...prevData, ...result.slice(0, limit)]); // Update data with fetched result
      setIsLoading(false); // Set loading to false
    } catch (error) {
      setError(error); // Set error state
      setIsLoading(false); // Set loading to false
    }
  }, [page]); // Dependency array includes page to trigger fetch on page change

  useEffect(() => {
    fetchData(); // Fetch data on component mount
  }, [fetchData]); // Dependency array includes fetchData to ensure useEffect runs only when fetchData changes

  // Callback function to observe the last element in the list
  const lastElementRef = useCallback(
    (node) => {
      if (isLoading) return; // If loading, do nothing
      if (observer.current) observer.current.disconnect(); // Disconnect previous observer
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1); // Increment page when last element is intersected
        }
      });
      if (node) observer.current.observe(node); // Observe the last element in the list
    },
    [isLoading] // Dependency array includes isLoading to trigger callback when isLoading changes
  );

  // Display loading message when data is being fetched for the first time
  if (isLoading && page === 1) return <p>Loading...</p>;
  // Display error message if there is an error
  if (error) return <p>Error loading data: {error.message}</p>;

  return (
    <div>
      <div className="column">
        {/* Map through the data array and render each item */}
        {data.map((coin, index) => {
          if (index === data.length - 1) {
            return (
              <div ref={lastElementRef} key={coin.id} className="coin">
                <p>{coin}</p>
              </div>
            );
          } else {
            return (
              <div key={coin.id} className="coin">
                <p>{coin}</p>
              </div>
            );
          }
        })}
      </div>
      {/* Display loading message when loading more data */}
      {isLoading && page > 1 && <p>Loading more data...</p>}
      {/* Display error message if there is an error */}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
};

export default Api;
