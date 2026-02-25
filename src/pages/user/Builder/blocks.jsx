import { ImageOutlined, SubjectOutlined, TextFieldsOutlined } from "@mui/icons-material";

const attributes = {
    text: ["FontSize", "Color", "BackgroundColor", "Padding", "Margin", "Align"],
    heading: ["FontSize", "Color", "BackgroundColor", "Padding", "Margin", "Align"],
    img: ["BackgroundColor", "Padding", "Margin", "Align", "Src"],
};

const blocks = [
    {
        label: "Text",
        icon: <SubjectOutlined color="primary" />,
        html: `
            <div selectable="true" eltype="text">
                This is some text
            </div>
        `,
    },
    {
        label: "H1",
        icon: <TextFieldsOutlined color="primary" />,
        html: `
            <h1 selectable="true" eltype="heading">
                This is some text
            </h1>
        `,
    },
    {
        label: "Image",
        icon: <ImageOutlined color="primary" />,
        html: `
            <img src="https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg" eltype="img" style="width: 100%;" selectable="true" />
        `,
    },
    {
        label: "Image Caption",
        icon: <ImageOutlined color="primary" />,
        html: `
            <div>
                <img src="https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg" eltype="img" style="width: 100%;" selectable="true" />
                <div style="color: #000000; font-size: 36px; font-weight: bold;" eltype="text" selectable="true">This is the caption</div>
            </div>
        `,
    },
];

export { blocks, attributes };
