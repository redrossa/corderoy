import {useState} from 'react';

export default function useOutfit() {
  const [items, setItems] = useState({
    "Upper": {},
    "Lower": {},
    "Shoes": {},
    "Bags": {},
    "Accessories": {}
  });

  const add = item => {
    const {part, product} = item;
    const itemz = {...items};
    switch (part) {
      case "Upper":
        itemz["Upper"][product.productCode] = item;
        break;
      case "Lower":
        itemz["Lower"][product.productCode] = item;
        break;
      case "Shoes":
        itemz["Shoes"][product.productCode] = item;
        break;
      case "Bags":
        itemz["Bags"][product.productCode] = item;
        break;
      case "Accessories":
        itemz["Accessories"][product.productCode] = item;
        break;
      default:
        return;
    }
    setItems(itemz);
  };

  const remove = item => {
    const {part, product} = item;
    const itemz = {...items};
    switch (part) {
      case "Upper":
        delete itemz["Upper"][product.productCode];
        break;
      case "Lower":
        delete itemz["Lower"][product.productCode];
        break;
      case "Shoes":
        delete itemz["Shoes"][product.productCode];
        break;
      case "Bags":
        delete itemz["Bags"][product.productCode];
        break;
      case "Accessories":
        delete itemz["Accessories"][product.productCode];
        break;
      default:
        return;
    }
    setItems(itemz);
  };

  const size = () => {
    return Object.entries(items)
        .map(([part, items]) => Object.keys(items).length)
        .reduce((a, b) => a + b, 0);
  };

  return {
    items,
    add,
    remove,
    size
  }
}