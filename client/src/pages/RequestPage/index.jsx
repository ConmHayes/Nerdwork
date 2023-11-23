import { useState, useEffect } from "react"
import { NavigationBar, TradeRequest, BookCard } from '../../components';
// Initial hardcoded data
import { useParams, useNavigate } from "react-router-dom";

const RequestPage = () => {
  // State to keep track of books
  const [requests, setRequests] = useState([])
  const [item, setItem] = useState([])
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState('')
  const [tradeRequest, setTradeRequest] = useState({})
  const navigate = useNavigate()
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
    const desiredRequestId = id;
    const singleRequest = findItemByRequestId(desiredRequestId, requests);
    setTradeRequest(singleRequest)
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
        setItem(itemDetail)
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

  function itemShelf() {
    return item.map(i => (
      <img className="insert-image request-image" 
           src={i.img}
           alt="" 
           key={i.item_id} 
           onClick={() => handleBookClick(i)}
           style={{marginRight: "20px"}}/>
        
      ));
  } 

  const handleBookClick = (i) => {
      setSelectedBook(i)
  }

  const printBook = () => {
    if (selectedBook === "") {
      return <p style={{marginTop: "30px"}}> Item selected:</p>
    } else {
      return (
      <>
      <p> Item selected: {selectedBook.title}</p>
      <img className="insert-image request-image" src={selectedBook.img} alt="" />
      <p> Description: {selectedBook.description}</p>
      <div className="flexbox-container">
        <button className="login-button" onClick={() => handleSwapRequest(selectedBook)}>Confirm Trade </button>
        <div style={{ width: '20px' }}></div>
        <button className="login-button" onClick={() => handleReject()}>Reject Trade</button>
      </div>
      </>
    )}
  }


    async function handleSwapRequest(selectedBook) {
      const book_id = selectedBook.item_id
      // console.log(tradeRequest)
      // console.log(book_id)
      // console.log(tradeRequest.user_email_request)
      // console.log(tradeRequest.user_email_requestie)
      // console.log(tradeRequest.wanted_item_id)
      try {
        const response = await fetch('https://nerdwork-server.onrender.com/trade/swap', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_email_requester: tradeRequest.user_email_request,
            user_email_requestie: tradeRequest.user_email_requestie,
            wanted_item_id : tradeRequest.wanted_item_id,
            requestie_item_id: book_id,
            accepted: false,
            rejected_by_requester: false,
            date: null
          }),
        });
  
        if (!response.ok) {
          const errorBody = await response.json(); 
          throw new Error(`HTTP error! status: ${response.status}, Message: ${errorBody.message}`);
        }
      } catch(e){
    console.log(e)
  }
}

const handleReject = async () => {
  try {
      const response = await fetch('https://nerdwork-server.onrender.com/trade/', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_email_request : tradeRequest.user_email_request,
          user_email_requestie : tradeRequest.user_email_requestie,
          wanted_item_id : tradeRequest.wanted_item_id
          })
      });
      const res = await response.json();
      navigate('/profile')
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  }

  return (
    <div>
      <NavigationBar />
      <div style={{position: "relative", top:"50px"}}>{itemShelf(item)}</div>
      <div style={{position: "relative", top:"150px"}}>{printBook()}</div>
    </div>
  );
};

export default RequestPage;
