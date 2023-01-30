export default function cx(...allArguments) {
    return allArguments.filter((element) => {
        return element;
    })
    .join(' ')
}