import { useState, useMemo, useEffect } from "react";
import "../styles.css"


export const Shape = ({ data }) => {

  const [selected, setSelected] = useState(new Set())
  const [unloading, setUnloading] = useState(false);
  const boxes = useMemo(() => data.flat(Infinity), [data]);

  const countOfVisibleBoxes = useMemo(() => boxes.reduce((acc, currVal) => acc+currVal), 0, [boxes]);

  const handleClick = (e) => {

    if(unloading) return;

    const {target} = e;
    const index = target.getAttribute('data-index')
    const status = target.getAttribute('data-status')

    if(index === null || !status || selected.has(index.toString())) {
      return;
    }
    setSelected((prev) => new Set(prev.add(index)))
  }

  const unload = () => {
    setUnloading(true)
    const keys = Array.from(selected.keys())
    const removeNextKeys = () => {
      if(keys.length) {
        const currentKey = keys.shift()
        setSelected((prev) => {
          const updatedSet = new Set(prev)
          updatedSet.delete(currentKey)
          return updatedSet;

        })

        setTimeout(removeNextKeys, 500)

      }else {
        setUnloading(false)
      }
    }

    setTimeout(removeNextKeys, 100)
  }

  useEffect(() => {
    if(selected.size>= countOfVisibleBoxes) {
      unload();
    }
  }, [selected])

  console.log({ selected, countOfVisibleBoxes })

  return (
    <div className="boxes" onClick={handleClick}>
          {boxes.map((item, index) => {
            const isVisible = item === 1;
            const isSelected = selected.has(index.toString())
            return (
              <div
                key={index}
                className={
                    `${isVisible ? 'box-show' : 'box-hide'}
                    ${isSelected ? 'selected' : 'unselected'}`
                }
                data-index={index}
                data-status={item}
              >
              </div>
          )})}
    </div>
  );
};
