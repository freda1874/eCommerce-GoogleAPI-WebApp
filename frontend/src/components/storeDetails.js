/*
* this file is to have the details of an item that will be listed on the front page, every single item will have this
* layout of the title, price and the picture to be displayed. A formatter for each item to be shown
*/
const storeDetails = ({storeModel}) => {
    return (
        <div className= "item-Details blue backround">
            <a href={itemModel.link} target="_blank" rel="noopener noreferrer">
            <div className="image-container">
            <h4>{itemModel.name}</h4>
            </div>
            </a>
        </div>
    )
}

export default storeDetails