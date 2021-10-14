export const initialState = {
  basket: [],
  user: null,
};

const reducer = (state, action) => {
  // console.log(action); //shows the action with dispatch.
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };

    case "EMPTY_BASKET":
      return {
        ...state,
        basket: [],
      };

    case "REMOVE_FROM_BASKET":
      //when you add same product multiple times, and if you need to remove one or two multiple occurance of that product and not the whole repeating product, then you need to remove using the index of the array.
      // if you try to directly remove using the id, then the whole product with that id will get removed, but we dont want that, we might need two quantities of that product.
      // so, using findIndex, we take the first index of the element, if there is a repetition, then using splice, we remove that index element.
      //then returning the newBasket as our final basket.
      const index = state.basket.findIndex((item) => {
        return item.id === action.id;
      });
      let newBasket = [...state.basket];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product (id: ${action.id}) as it's not in the basket.`
        );
      }
      return {
        ...state,
        basket: newBasket,
      };
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};

//For making the Subtotal Section.
//You can write a total-price function inside the subtotal section, but using a reduce() to do the same, inside of a reducer, is a proffessional practice of doing things. Hence this...
export const getBasketTotal = (basket) => {
  return basket.reduce((amount, currentItem) => currentItem.price + amount, 0);
  //currentItem is the item inside the basket.
  //reduce() will automatically loop through the basket array.
};

export default reducer;
