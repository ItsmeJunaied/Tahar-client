import {
  createBrowserRouter,
} from "react-router-dom";
import Main from "./Layout/Main";
import Home from "./Pages/Home/Home/Home";
import Collections from "./Pages/Collections/Collections";
import ShopMen from "./Pages/ShopMen/ShopMen";
import ShopWomen from "./Pages/ShopWomen/ShopWomen";
import Return from "./Pages/Return/Return";
import Contact from "./Pages/Contact/Contact";
import Sale from "./Pages/Sale/Sale";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import DashBoard from "./Layout/DashBoard";
import UploadProducts from "./Pages/DashBoard/UploadProducts/UploadProducts";
import ManageProducts from "./Pages/DashBoard/ManageProducts/ManageProducts";
import ManageUsers from "./Pages/DashBoard/ManageUsers/ManageUsers";
import CartItems from "./Pages/DashBoard/CartItems/CartItems";
import MyItems from "./Pages/DashBoard/MyItems/MyItems";
import PaymentHistory from "./Pages/DashBoard/PaymentHistory/PaymentHistory";
import CustomerSpotlight from "./Pages/CustomerSpotlight/CustomerSpotlight";
import UploadSpotlight from "./Pages/DashBoard/UploadSpotlight/UploadSpotlight";
import Cart from "./Shared/Cart/Cart";
import ProductDetails from "./Shared/ProductDetails/ProductDetails";
import UploadProductsPro from "./Pages/DashBoard/UploadProductsPro/UploadProductsPro";
import CategoryUpload from "./Pages/DashBoard/CategoryUpload/CategoryUpload";
import UploadFabrics from "./Pages/DashBoard/UploadFabrics/UploadFabrics";
import CategoryShow from "./Pages/Home/CategoryShow/CategoryShow";
import ViewAll from "./Pages/Home/ViewAll/ViewAll";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/product/category/:category',
        element: <Collections></Collections>,
        loader: ({ params }) => fetch(`https://tahar-server.vercel.app/product/category/${params.category}`)
      },

      {
        path: '/ViewAll',
        element: <ViewAll></ViewAll>
      },
      {
        path: '/shop-men',
        element: <ShopMen></ShopMen>
      },
      {
        path: '/shop-women',
        element: <ShopWomen></ShopWomen>
      },
      {
        path: '/return',
        element: <Return></Return>
      },
      {
        path: '/contact',
        element: <Contact></Contact>
      },
      {
        path: '/customer-spotlight',
        element: <CustomerSpotlight></CustomerSpotlight>
      },
      {
        path: '/sale',
        element: <Sale></Sale>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/signup',
        element: <Signup></Signup>
      },
      {
        path: '/cart',
        element: <Cart></Cart>
      },
      {
        path: '/product/:id',
        element: <ProductDetails></ProductDetails>,
        loader: ({ params }) => fetch(`https://tahar-server.vercel.app/product/${params.id}`)
      },

    ]
  },
  {
    path: "dashboard",
    element: <DashBoard></DashBoard>,
    children: [
      {
        path: 'uploadProducts',
        element: <UploadProducts></UploadProducts>
      },
      {
        path: 'categoryUpload',
        element: <CategoryUpload></CategoryUpload>,
      },
      {
        path: 'categoryUpload/:id',
        element: <CategoryUpload></CategoryUpload>,
        loader: ({ params }) => fetch(`https://tahar-server.vercel.app/product/${params.id}`)
      },
      {
        path: 'manageProducts',
        element: <ManageProducts></ManageProducts>
      },
      {
        path: 'manageUsers',
        element: <ManageUsers></ManageUsers>
      },
      {
        path: 'uploadCustomerSpot',
        element: <UploadSpotlight></UploadSpotlight>
      },
      {
        path: 'cartItems',
        element: <CartItems></CartItems>
      },
      {
        path: 'myItems',
        element: <MyItems></MyItems>
      },
      {
        path: 'paymentHistory',
        element: <PaymentHistory></PaymentHistory>
      }
    ]
  }

]);

export default router;