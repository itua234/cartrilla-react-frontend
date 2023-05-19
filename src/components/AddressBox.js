const AddressBox = (props) => {
    return (
        <>
            <div>{props.content.firstname} {props.content.lastname}</div>
            <div>{props.content.street} </div>
            <div>{props.content.city} </div>
            <div>{props.content.state} </div>
            <div>{props.content.email} </div>
        </>
    );
}

export default AddressBox;
