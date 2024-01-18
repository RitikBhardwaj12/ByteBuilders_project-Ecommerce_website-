import React from 'react'
import "./SideBar.css"
import { AiOutlineClose } from "react-icons/ai"
import { AppDesc, AppText, Button, HR, ProductCard3 } from ".."
import { useNavigate } from 'react-router-dom'
import { Price } from '../../utility/Price'
import { useDispatch} from 'react-redux'
import { deleteCartItem,  updateCartItem } from '../../redux/cartSlice'

const index = ({ handleSideBar, open, updateData,user,handleAuthForm,updateCartLen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  if (open) {
    document.body.style.overflowY = "hidden";
  }
  else {
    document.body.style.overflowY = "scroll";
  }
  const data = JSON.parse(localStorage.getItem("cart"));
  const price = Price();
  async function deleteProductFromCart(item) {
    dispatch(deleteCartItem(item));
    updateData();
    updateCartLen();
  }

  const handleUpdateCartItem = (item) => {
    updateData();
    dispatch(updateCartItem(item))
  }
  const handleInc = (up) => {
    const updatedItem = data.find((item) => item._id === up._id);
    if (updatedItem) {
      var quan = updatedItem.quantity;
      quan += 1;
      handleUpdateCartItem({ ...updatedItem, quantity: quan });
    }
  }
  const handleDec = (up) => {
    if (up?.quantity > 1) {
      const updatedItem = data.find((item) => item._id === up._id);
      if (updatedItem) {
        var quan = updatedItem.quantity;
        quan -= 1;
        handleUpdateCartItem({ ...updatedItem, quantity: quan });
      }
    }
  }

  const handleCheckout = () => {
    if(!user || user === null){
      handleAuthForm();
      handleSideBar();
      localStorage.setItem("history","/checkout");
      return;
    }
    else{
      navigate("/checkout");
      handleSideBar();
    }
  }
  return (
    <>
      <div>
        {open && <div onClick={handleSideBar} className='side-overlay z-10'></div>}
        <div className={`side-contain ${open && "side-contain-active"} xxs:w-[20rem] xs:w-[90%] md:w-[30rem] overflow-scroll`}>
          <div className='flex flex-col justify-between h-full'>
            <div>
              <div className='min-h-[5vh] py-5 bg-background_primary flex justify-between px-5 items-center'>
                <AppDesc>Shopping Bag</AppDesc>
                <AiOutlineClose onClick={handleSideBar} className="cursor-pointer" color='#724B50' size={25} />
              </div>
              {/* Product card Here  */}
              <div className='max-h-[70vh] overflow-y-scroll product_card'>
                {
                  (!data || data.length === 0 || data === null || data === 'null' || data === undefined)
                    ?
                    <AppDesc className={"py-10"}>No Product in the Cart</AppDesc>
                    :
                    data.map((item, key) => (
                      <div key={key}>
                        <div className='py-4 px-2 xs:px-6 lg:py-10 lg:px-5 flex  justify-between'>
                          <div className='flex-1 flex items-center gap-1 xs:gap-3'>
                            <div>
                              <ProductCard3 img={item?.images[0]} />
                            </div>
                            <div className='flex flex-col items-center gap-2 lg:gap-10'>
                              <AppText>{item?.name}</AppText>
                              <AppText>₹{item?.price}</AppText>
                            </div>
                          </div>
                          <div className='flex-1 flex flex-col gap-14 items-end'>
                            <AiOutlineClose onClick={() => deleteProductFromCart(item)} className="cursor-pointer" color='#724B50' size={20} />
                            <div className='flex'>
                              <p className='border-primary border p-3 cursor-pointer font-bold' onClick={() => handleDec(item)}>-</p>
                              <p className='border-primary border p-3' aria-disabled>{item?.quantity}</p>
                              <p className='border-primary border p-3 cursor-pointer font-bold' onClick={() => handleInc(item)}>+</p>
                            </div>
                          </div>
                        </div>
                        <HR />
                      </div>
                    ))
                }
              </div>
              {/* Product card Here  */}
            </div>
            <div className='px-5'>
              <HR />
              <div className='flex justify-between'>
                <AppDesc className={"font-secondary_font lg:text-xl"}>Total</AppDesc>
                <AppDesc className={"font-secondary_font lg:text-xl"}>₹{price}</AppDesc>
              </div>
              <HR />
              <div className='px-1 py-4'>
                <div className='flex-1 mb-10 lg:mb-4'>
                  <Button
                    title="Checkout"
                    className={"w-full h-12 lg:h-14"}
                    handleSubmit={() => { handleCheckout()}}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default index
