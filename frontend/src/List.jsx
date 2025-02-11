function List(props) {
  
  return (
    <>
      <div className="transaction">
        <div className="datetime">{props.date}</div>
        <div className="name">{props.name}</div>
        <div className={"price " + (props.price > 0 ? "green" : "red")}>
          {props.price}
        </div>
        <button
          type="submit"
          className="submit-btn"
          onClick={() => props.deleteExpense(props.id)}
        >
          X
        </button>
      </div>
    </>
  );
}

export default List;