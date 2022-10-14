const Center = (props) => {
    // Default prop values
    const { className, style, direction = "column", children } = props;

    return (
        <div className={`flex flex-${direction} align-items-center justify-content-center ${className}`} style={style}>
            {children}
        </div>
    )
}

export default Center;