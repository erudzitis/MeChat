const Link = (props) => {
    // Default prop values
    const { className, style, href, label } = props;

    return (
        <a href={href} className={`font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer ${className}`} style={style}>
            {label}
        </a>
    )
}

export default Link;