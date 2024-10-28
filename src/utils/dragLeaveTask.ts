export const dragLeaveTask = (currentTarget: HTMLElement) => {
    const parentNode = currentTarget.parentNode as HTMLDivElement;
    if (parentNode && parentNode.childNodes)
        parentNode.childNodes.forEach(task => {
            const taskItem = task as HTMLDivElement;
            if (taskItem && taskItem.style) taskItem.style.backgroundColor = '#ffffff'
        })
}