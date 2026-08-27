 let cart =
            JSON.parse(
                localStorage.getItem("ebayCart")
            ) || [];


        const container =
            document.getElementById(
                "cart-container"
            );


        const totalElement =
            document.getElementById(
                "cart-total"
            );


        function saveCart() {

            localStorage.setItem(
                "ebayCart",
                JSON.stringify(cart)
            );

        }


        function displayCart() {

            container.innerHTML = "";

            let total = 0;


            if (cart.length === 0) {

                container.innerHTML =
                    "<p>Your cart is empty.</p>";

                totalElement.textContent =
                    "Total: $0";

                return;

            }


            cart.forEach((item, index) => {

                total +=
                    item.price *
                    item.quantity;


                const itemElement =
                    document.createElement("div");


                itemElement.className =
                    "cart-item";


                itemElement.innerHTML = `

                    <img
                        src="${item.image}"
                        alt="${item.name}"
                    >

                    <div class="cart-info">

                        <h3>
                            ${item.name}
                        </h3>

                        <p>
                            $${item.price}
                        </p>

                        <div class="quantity">

                            <button
                                onclick="decreaseQuantity(${index})"
                            >
                                −
                            </button>

                            <span>
                                ${item.quantity}
                            </span>

                            <button
                                onclick="increaseQuantity(${index})"
                            >
                                +
                            </button>

                        </div>

                        <button
                            class="remove"
                            onclick="removeItem(${index})"
                        >
                            Remove
                        </button>

                    </div>

                `;


                container.appendChild(
                    itemElement
                );

            });


            totalElement.textContent =
                "Total: $" +
                total.toFixed(2);

        }


        function increaseQuantity(index) {

            cart[index].quantity++;

            saveCart();

            displayCart();

        }


        function decreaseQuantity(index) {

            if (
                cart[index].quantity > 1
            ) {

                cart[index].quantity--;

            } else {

                cart.splice(index, 1);

            }


            saveCart();

            displayCart();

        }


        function removeItem(index) {

            cart.splice(index, 1);

            saveCart();

            displayCart();

        }


        displayCart();