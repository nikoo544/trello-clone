import {XYCoord, useDragLayer} from "react-dnd";
import {Column} from "./Column";
import React from "react";
import {CustomDragLayerContainer} from "./styles";

const CustomDragLayer: React.FC = () => {
    const { isDragging, item, currentOffset } = useDragLayer(monitor => ({
        item: monitor.getItem(),
        currentOffset: monitor.getSourceClientOffset(),
        isDragging: monitor.isDragging()
    }))


    function getItemStyles(currentOffset: XYCoord | null): React.CSSProperties {
        if (!currentOffset) {
            return {
                display: "none"
            }
        }
        const { x, y } = currentOffset
        const transform = `translate(${x}px, ${y}px)`
        return {
            transform,
            WebkitTransform: transform
        }
    }


    return isDragging ? (
        <CustomDragLayerContainer>
            <div style={getItemStyles(currentOffset)}>
            <Column
                id={item.id}
                text={item.text}
                index={item.index}
                isPreview={true}
            />
            </div>
        </CustomDragLayerContainer>
    ) : null
}

export default CustomDragLayer



