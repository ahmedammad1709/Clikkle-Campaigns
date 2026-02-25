import { memo } from "react";

function FontSize(props) {
    const { get } = props;

    return (
        <div>
            Font Size:
            <input
                type="number"
                edit="fontSize"
                suffix="px"
                value={parseInt(get.style("font-size"))}
            />
        </div>
    );
}

export default memo(FontSize);
