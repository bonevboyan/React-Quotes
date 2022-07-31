import React from "react";
import useInput from "../../hooks/use-input";

import { useAppDispatch } from "../../store/hooks";
import { productActions } from "../../store/product-slice";

import classes from "./AddProduct.module.css"

const AddProduct = () => {
    const dispatch = useAppDispatch();

    const {
        value: enteredTitle,
        isValid: titleIsValid,
        hasError: titleError,
        valueChangeHandler: titleChangeHandler,
        inputBlurHandler: titleBlurHandler,
        reset: titleReset,
    } = useInput((value: string) => value.length >= 3);

    const {
        value: enteredPrice,
        isValid: priceIsValid,
        hasError: priceError,
        valueChangeHandler: priceChangeHandler,
        inputBlurHandler: priceBlurHandler,
        reset: priceReset,
    } = useInput((value: string) => +value > 0);

    const {
        value: enteredDescription,
        isValid: descriptionIsValid,
        hasError: descriptionError,
        valueChangeHandler: descriptionChangeHandler,
        inputBlurHandler: descriptionBlurHandler,
        reset: descriptionReset,
    } = useInput((value: string) => value.length >= 20);

    const isFormValid = titleIsValid && descriptionIsValid && priceIsValid;
    
    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();

        priceReset();
        titleReset();
        descriptionReset();
        
        dispatch(productActions.addProduct({
            description: enteredDescription,
            price: +enteredPrice,
            title: enteredTitle
        }));
    }

    return <section className={classes.productForm}>
        <h2>
            Add a product to the shop
        </h2>
        <form className={classes.form} onSubmit={submitHandler}>
            <div className={classes.control}>
                <label htmlFor="name">Title</label>
                <input
                    type="text"
                    id="name"
                    onBlur={titleBlurHandler}
                    onChange={titleChangeHandler}
                    value={enteredTitle}
                />
                {titleError && (
                    <p className={classes["error-text"]}>
                        Title should be at least 3 characters long.
                    </p>
                )}
            </div>
            <div className={classes.control}>
                <label htmlFor="name">Price</label>
                <input
                    type="number"
                    id="price"
                    onBlur={priceBlurHandler}
                    onChange={priceChangeHandler}
                    value={enteredPrice}
                />
                {priceError && (
                    <p className={classes["error-text"]}>
                        Price should be positive.
                    </p>
                )}
            </div>
            <div className={classes.control}>
                <label htmlFor="name">Description</label>
                <input
                    type="text"
                    id="description"
                    onBlur={descriptionBlurHandler}
                    onChange={descriptionChangeHandler}
                    value={enteredDescription}
                />
                {descriptionError && (
                    <p className={classes["error-text"]}>
                        Description field should be at least 20 characters long.
                    </p>
                )}
            </div>
            <div className={classes.actions}>
                <button className={classes.submit} disabled={!isFormValid}>
                    Add
                </button>
            </div>
        </form>
    </section>
} 

export default AddProduct;