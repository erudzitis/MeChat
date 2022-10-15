const Stack = (props) => {
    // Default prop values
    const { className, style, spacing = 0, direction = "column", position = "relative", children } = props;

    return (
        <div className={`${position} flex flex-${direction} gap-${spacing} ${className}`} style={style}>
            {children}
        </div>
    )
}

export default Stack;