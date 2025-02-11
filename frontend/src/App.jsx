import { useEffect, useState } from "react";
import "./App.css";
import List from "./List";
import Heading from "./Heading";

function App() {
  const [name, setname] = useState("");
  const [price, setprice] = useState("");
  const [datetime, setdate] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [incomeAmt, setIncomeAmt] = useState(0);
  const [expenseAmt, setExpenseAmt] = useState(0);
  const [total, settotal] = useState();

  useEffect(() => {
    getTransactions().then(setTransactions);
  }, []);

  useEffect(() => {
    const amounts = transactions.map((item) => item.price);
    const income = amounts
      .filter((item) => item > 0)
      .reduce((acc, item) => (acc += item), 0);
    const exp =
      amounts
        .filter((item) => item < 0)
        .reduce((acc, item) => (acc += item), 0) * -1;
    setIncomeAmt(income);
    setExpenseAmt(exp);
    settotal(income - exp);
  }, [transactions]);

  async function getTransactions() {
    const url = "http://localhost:5000/api/transaction";
    const res = await fetch(url);
    return await res.json();
  }

  function addExpense(ev) {
    ev.preventDefault();
    const url = "http://localhost:5000/api/transaction";

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price, datetime }),
    }).then((res) => {
      res.json().then((json) => {
        setTransactions([...transactions,json]);
        setname("");
        setprice("");
        setdate("");
        console.log("result", json);
      });
    });
  }

  function deleteExpense(id) {
    const url = `http://localhost:5000/api/transaction/${id}`;

    fetch(url, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          res.json().then((json) => {
            console.log("Deleted transaction", json);
            setTransactions((prevTransactions) =>prevTransactions.filter((transaction) => transaction._id !== id));
            
          });
        } else {
          console.error("Error deleting the transaction");
        }
      })
      .catch((error) => {
        console.error("Network error:", error);
      });
  }

  return (
    <main>
      <Heading
        total={total}
        income={incomeAmt}
        expense={expenseAmt}
      />
      <form className="expense-form" onSubmit={addExpense}>
        <div className="form-group">
          <label htmlFor="description">Expense Description:</label>
          <input
            value={name}
            onChange={(ev) => setname(ev.target.value)}
            type="text"
            id="description"
            placeholder="Enter description..."
          />
        </div>
        <div className="basic">
          <div className="form-group">
            <label htmlFor="amount">Amount:</label>
            <input
              value={price}
              onChange={(ev) => setprice(ev.target.value)}
              type="number"
              id="amount"
              placeholder="Enter amount..."
            />
          </div>
          <div className="form-group">
            {" "}
            <label htmlFor="date">Date:</label>
            <input
              value={datetime}
              onChange={(ev) => setdate(ev.target.value)}
              type="date"
              id="date"
              placeholder="dd-mm-yyyy"
            />
          </div>
        </div>
        <button type="submit" className="submit-btn">
          Add Expense
        </button>
      </form>

      <div className="transactions">
        {transactions.length > 0 &&
          transactions.map((transaction) => (
            <List
              key={transaction._id}
              id={transaction._id}
              name={transaction.name}
              price={transaction.price}
              deleteExpense={deleteExpense}
              date={transaction.datetime.slice(0, 10)}
            />
          ))}
      </div>
    </main>
  );
}

export default App;