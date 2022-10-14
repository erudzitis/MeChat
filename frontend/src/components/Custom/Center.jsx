const Center = (props) => {
    // Default prop values
    const { className, style = {}, direction = "column", expand = false, children } = props;

    const expandStyle = expand ? { position: "absolute", top: 0, right: 0, bottom: 0, left: 0 } : {};
    const appliedStyle = { ...style, ...expandStyle};

    return (
        <div className={`flex flex-${direction} align-items-center justify-content-center ${className}`} style={appliedStyle} >
            {children}
        </div>
    )
}

export default Center;