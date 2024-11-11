import { useState } from "react";
const itemsArray = [
  "milk",
  "break",
  "curd",
  "chocolate",
  "ice cream",
  "onion",
  "potato",
  "razor",
  "pen",
  "oil",
  "corns",
  "flour",
  "salt",
  "honey",
  "tea",
  "coffee",
  "sugar",
  "brown Sugar",
  "rice",
];

export const ItemList = () => {
  const [showList, setShowList] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);

  const addToChip = (item) => {
    setSelectedItems([...selectedItems, item]);
  };

  const removeChip = (itm, index) => {
    const updatedItems = selectedItems.filter((item) => item !== itm);
    setSelectedItems([...updatedItems]);
  };

  console.log({ selectedItems });

  const filteredWithoutChips =
    selectedItems.length > 0
      ? itemsArray.filter((item) => selectedItems.indexOf(item) === -1)
      : itemsArray;

  console.log({ filteredWithoutChips });

  const filteredItems = searchText
    ? filteredWithoutChips.filter((item) =>
        item.toLowerCase().includes(searchText.toLowerCase())
      )
    : filteredWithoutChips;
  return (
    <div className="input">
      <input
        onFocus={() => setShowList(true)}
        onChange={(e) => setSearchText(e.target.value)}
        value={searchText}
      />
      {showList ? (
        <ul>
          {filteredItems.map((item, index) => (
            <li key={index} onClick={() => addToChip(item)}>
              {item}
            </li>
          ))}
        </ul>
      ) : null}
      <div>
        {selectedItems.map((item) => (
          <div key={item}>
            {item}
            {"               "}
            <button onClick={() => removeChip(item)}>x</button>
          </div>
        ))}
      </div>
    </div>
  );
};
