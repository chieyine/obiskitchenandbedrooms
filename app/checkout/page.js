import CheckoutClient from "./CheckoutClient";

export const metadata = {
  title: "Checkout | Obi's Kitchen & Bedrooms",
  description: "Send your quote request to Obi's Kitchen & Bedrooms.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}
