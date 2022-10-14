const Error = ({ errors, target }) => {
    // If no target is passed, we render error if there is one
    if (typeof (target) === "undefined") {
        return (
            errors && <small className="p-error -mt-4">{errors}</small>
        )
    }

    return (
        errors[target] && <small className="p-error -mt-4">{errors[target].message}</small>
    )
}

export default Error;