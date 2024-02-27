const service = (props) => {
    return (
        <div className="text-center">
          <div className="bg-primary-app rounded-full text-white p-3 w-fit mx-auto mb-2">
            {props.icon}
          </div>
          <h5 className="font-semibold text-xl mb-1">{props.title}</h5>
          <p className="font-playfair">
            {props.description}
          </p>
        </div>
    );
}

export default service;