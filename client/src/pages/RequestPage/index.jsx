import { useState, useEffect } from "react"
import { NavigationBar, TradeRequest, Bookshelf } from '../../components';

// Initial hardcoded data
import { useParams } from "react-router-dom";

const RequestPage = () => {
  // State to keep track of books
  const [requests, setRequests] = useState([])
  const [item, setItem] = useState([])
  const [books, setBooks] = useState([]);
  let { id } = useParams()
  id = parseInt(id)
  const fetchRequest = async () => {
    try {
      const response = await fetch('https://nerdwork-server.onrender.com/trade/', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      const requestData = data.requests; // Access the Communities array in the response
      setRequests(requestData)
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  const requestProfile = async (id, requests) => {
    // Example usage
    const desiredRequestId = id;
    const singleRequest = findItemByRequestId(desiredRequestId, requests);
    const requestEmail = singleRequest.user_email_request
    const item_id = singleRequest.wanted_item_id
    let ourCategory = undefined
    try {
      const response = await fetch('https://nerdwork-server.onrender.com/item/', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      const itemData = data.Items; 
      const ourItem = itemData.filter(item => item_id == item.item_id)
      ourCategory = ourItem[0].category

      try {
        const response = await fetch(`https://nerdwork-server.onrender.com/user/${requestEmail}/${ourCategory}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const userData = await response.json();
        const itemDetail = userData.items; 
      } catch (error) {
        console.error('Error fetching item:', error);
      }
    } catch (error) {
      console.error('Error fetching item:', error);
    }

    

  }

  useEffect(() => {
      requestProfile(id, requests);
  }, [id, requests]);

  function findItemByRequestId(requestId, data) {
    for (const item of data) {
        // console.log(item)
        if (item.request_id === requestId) {
            return item;
        }
    }
    return null;
}

function displaybooks() {
  return requests.map(request => (
      <div key={request.request_id} >
          <h2>The email who requested: {request.user_email_request}</h2>
          <p>The item_id that was requested: {item.filter(items => items.item_id == request.wanted_item_id).map(item => item.title)}</p>
          <button onClick={() => handleViewTrades(request)}>View Trades</button>
          <button onClick={() => handleReject(request)}>reject</button>
      </div>
    ));
} 






  const handleTradeRequest = (selectedBookId, selectedDate) => {
    // Find the book in the books array
    const bookToTrade = books.find(book => book.id === selectedBookId);
    if (bookToTrade) {
      // Perform trade logic here, for example, mark the book as traded
      bookToTrade.traded = true;

      // For simplicity, we'll just log the trade details
      console.log(`Book traded: ${bookToTrade.title} on date: ${selectedDate}`);
      // If you want to update the state with the trade details, you'd
      // set a new state here
      setBooks([...books]);
    }
  };

  return (
    <div>
      <NavigationBar />
      <Bookshelf items={books} />
      <TradeRequest books={books} onTradeRequest={handleTradeRequest} />
    </div>
  );
};

export default RequestPage;
