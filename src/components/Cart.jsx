function Cart() {
  return (
    <section className="cart">
      <div>
        <button></button>
        <div>
          <p>Restaurant Name</p>
          <p>
            <span>items</span>
            <span>Eta</span>
          </p>
        </div>
      </div>
      <div className="items">
        <p>itemname</p>
        <div className="add-remove">
          <button>-</button>
          <p>itemnumber</p>
          <button>+</button>
        </div>
      </div>
      <div className="bill-details">
        <p>Item Total</p>
        <p>delivery fee</p>
        <p>tax</p>
        <p>ToPay</p>
        <p>$ (right)</p>
        <p>$</p>
        <p>$</p>
        <p>$</p>
      </div>
      <div className="order">
        <p>PlaceYourOrder</p>
        <button>Order</button>
      </div>
    </section>
  );
}
export default Cart;
