import { render } from "@testing-library/react";
import React, { useState } from "react";

import Aux from "../../hoc/ReactAux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import { checkPropTypes } from "prop-types";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const BurgerBuilder = () => {
  const [ingredients, setIngredients] = useState({
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
    purchasable: false,
  });

  const [purchasing, setPurchasing] = useState({
    purchasing: false,
  });

  const updatedPurchaseState = (ingredients, newPrice) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    setIngredients({
      ingredients: ingredients,
      totalPrice: newPrice,
      purchasable: sum > 0,
    });
  };

  const addIngredientHandler = (type) => {
    const oldCount = ingredients.ingredients[type];
    const updatedCounted = oldCount + 1;
    const updatedIngredients = {
      ...ingredients.ingredients,
    };
    updatedIngredients[type] = updatedCounted;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = ingredients.totalPrice;
    const newPrice = oldPrice + priceAddition;
    const ing = updatedIngredients;
    const total = newPrice;
    setIngredients({ totalPrice: newPrice, ingredients: updatedIngredients });
    updatedPurchaseState(ing, total);
  };

  const removeIngredientHandler = (type) => {
    const oldCount = ingredients.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCounted = oldCount - 1;
    const updatedIngredients = {
      ...ingredients.ingredients,
    };
    updatedIngredients[type] = updatedCounted;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = ingredients.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    const ing = updatedIngredients;
    const total = newPrice;
    setIngredients({ totalPrice: newPrice, ingredients: updatedIngredients });
    updatedPurchaseState(ing, total);
  };

  const purchaseHandler = () => {
    setPurchasing({ purchasing: true });
  };

  const purchaseCancelHandler = () => {
    setPurchasing({ purchasing: false });
  };
  const purchaseContinueHandler = () => {
    alert("You Continue!");
  };

  const disabledInfo = {
    ...ingredients.ingredients,
  };
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  return (
    <Aux>
      <Modal show={purchasing.purchasing} modalClosed={purchaseCancelHandler}>
        <OrderSummary
          ingredients={ingredients.ingredients}
          purchaseCancelled={purchaseCancelHandler}
          purchaseContinued={purchaseContinueHandler}
          price={ingredients.totalPrice}
        />
      </Modal>
      <Burger ingredients={ingredients.ingredients} />
      <BuildControls
        ingredientAdded={addIngredientHandler}
        ingredientDeducted={removeIngredientHandler}
        disabled={disabledInfo}
        purchasable={ingredients.purchasable}
        price={ingredients.totalPrice}
        ordered={purchaseHandler}
      />
    </Aux>
  );
};

export default BurgerBuilder;
