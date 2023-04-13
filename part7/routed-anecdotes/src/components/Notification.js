const Notification = ({ message }) => {
    if (message === '') {
        return null;
    }

    return (
        <h1>{message}</h1>
    );
};

export default Notification;