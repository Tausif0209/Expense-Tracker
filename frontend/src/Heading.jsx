function Heading(props) {
  
  return (
    <>
      <h1>
        Your Balance is ₹{props.total}<span>.00</span>
      </h1>
      <div className="top">
        <div className="income">Income</div>
        <div className="income-value">₹{props.income}</div>
        <div className="expense">Expense</div>
        <div className="expense-value">₹{props.expense}</div>
      </div>
    </>
  );
}

export default Heading;