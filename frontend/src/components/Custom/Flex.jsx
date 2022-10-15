const Flex = (props) => {
    // Default prop values
    const { className, style = {}, direction = "row", align = "stretch", justify = "start", position = "relative", children } = props;

    return (
        <div className={`${position} flex flex-${direction} align-items-${align} justify-content-${justify} ${className}`} style={style} >
            {children}
        </div>
    )
}

export default Flex;