import { useState, useEffect } from "react"
import { NavigationBar, TradeRequest, BookCard } from '../../components';
// Initial hardcoded data
import { useParams, useNavigate } from "react-router-dom";
import "./index.css"

const RequestPage = () => {
  // State to keep track of books
  const [requests, setRequests] = useState([])
  const [item, setItem] = useState([])
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState("")
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
    const booksPerRow = 5;
  
    const rows = [];
  
    for (let i = 0; i < item.length; i += booksPerRow) {
      const row = item.slice(i, i + booksPerRow);
  
      // Add empty columns on each side
      const emptyColumnLeft = <div className="col-1"></div>;
      const emptyColumnRight = <div className="col-1"></div>;
  
      const booksInRow = row.map((book) => (
        <div className="col-2" key={book.item_id}>
          <button className="btn-container" onClick={() => handleBookClick(book)}>
            <h5>{book.title}</h5>
            <img src={book.img} alt="" />
          </button>
        </div>
      ));
  
      rows.push(
        <div className="row" key={i}>
          {emptyColumnLeft}
          {booksInRow}
          {emptyColumnRight}
        </div>
      );
    }
  
    return rows;
  }
  
  

  const handleBookClick = (i) => {
      setSelectedBook(i)
  }

  const printBook = () => {
    if (selectedBook === "") {
      return <p> book selected:</p>
    } else {
      return (
      <>
      <p className="title"> <strong>Book Selected: </strong><br /> {selectedBook.title}</p>
      <img src={selectedBook.img} alt="" />
      <p className="description"> book selected: {selectedBook.description}</p>
      <button onClick={() => handleSwapRequest(selectedBook)} className="confirm-or-reject">Confirm Trade </button>
      <button onClick={() => handleReject()} className="confirm-or-reject">Reject Trade</button>
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
        navigate('/profile')
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
    <>
      <NavigationBar />
      <h1>Your Requests</h1>
        <div>{itemShelf(item)}</div>

      { selectedBook !== "" ? (
        <div className="row">
          <div className="col-4"></div>
          <div className="col-4 selected-book">
            {printBook()}
          </div>
          <div className="col-4"></div>
        </div> ) : <></>
      }
    </>
  );
};

export default RequestPage;
