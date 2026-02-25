import { Box, Grid } from "@mui/material";
import { useState, useRef, createElement, createContext, useMemo } from "react";
import { blocks, attributes } from "./blocks";
import styles from "./styles";
import editors from "./editors";
import { AddOutlined, EditOutlined, RemoveOutlined } from "@mui/icons-material";

const context = createContext();

function Builder() {
	const [selected, setSelected] = useState(null);
	// Going to contain
	// { el, type}

	const optionRef = useRef(null);
	const contentArea = useRef(null);

	function selectElement(e) {
		e.preventDefault();
		const el = e.target;

		if (el.getAttribute("selectable") === "true") {
			// select the element if it's selectable
			setSelected({
				el,
				type: el.getAttribute("eltype"),
			});
			showOptionBar(el);
		} else {
			// set the selected to null if it's not selectable

			if (selected) {
				removeOptionBar(selected.el);
			}
			setSelected(null);
		}
	}

	const controls = useMemo(
		() => ({
			editStyle: function (e) {
				const value = e.target.value;
				const toEdit = e.target.getAttribute("edit"); // What to edit
				const suffix = e.target.getAttribute("suffix") ?? ""; // what to add as suffix

				const el = selected.el;

				el.style[toEdit] = value + suffix; // set the desireable value to the selected element
			},
			setStyle: function (e) {
				e.target = e.currentTarget;
				e.target.value = e.currentTarget.getAttribute("setvalue");
				this.editStyle(e);
			},
			editAttribute: function (e) {
				const toEdit = e.target.getAttribute("edit");
				const value = e.target.value;
				selected.el.setAttribute(toEdit, value);
			},
			setAttribute: function (e) {
				e.target = e.currentTarget;
				e.target.value = e.currentTarget.getAttribute("setvalue");
				this.editAttribute(e);
			},
		}),
		[selected]
	);

	const get = useMemo(
		() => ({
			style: function (attr) {
				const value = window.getComputedStyle(selected.el, null).getPropertyValue(attr); // get the attribute value from  the selected element
				return value;
			},
			attribute: function (attr) {
				const value = selected.el.getAttribute(attr);
				return value;
			},
		}),
		[selected]
	);

	function showOptionBar(el) {
		// Remove the option bar from previous selection
		if (selected) {
			removeOptionBar(selected.el);
		}

		const optionBar = optionRef.current;
		optionBar.style.display = "block";

		// Adding the selected bar to the selected element
		el.style.position = "relative";
		el.appendChild(optionBar);
	}

	function removeOptionBar(el) {
		el.querySelector("div[eltype=optionbar]").remove();
	}

	function addElement(block) {
		const newElement = block.html;
		contentArea.current.innerHTML += newElement;
	}

	// useEffect(() => {
	//
	// }, [selected]);

	return (
		<Grid container style={{ height: "100%" }}>
			<Grid item xs={10}>
				<div style={{ all: "initial" }}>
					<Box
						id="content"
						onClick={selectElement}
						ref={contentArea}
						style={styles.contentArea}></Box>
				</div>
			</Grid>
			<Grid item xs={2}>
				{selected ? (
					<context.Provider value={{}}>
						{attributes[selected.type].map(editor =>
							createElement(editors[editor], { controls, get })
						)}
					</context.Provider>
				) : (
					<Grid container spacing={1}>
						{blocks.map(block => (
							<Grid item xs={4}>
								<div style={styles.block} onClick={() => addElement(block)}>
									{block.icon}
								</div>
							</Grid>
						))}
					</Grid>
				)}
			</Grid>
			<div eltype="optionbar" ref={optionRef} style={styles.optionBar}>
				<div
					style={{
						position: "absolute",
						top: "calc(100% + 2px)",
						right: "-2px",
						backgroundColor: "green",
						display: "flex",
					}}>
					<EditOutlined />
					<AddOutlined />
					<RemoveOutlined />
				</div>
			</div>
		</Grid>
	);
}

export default Builder;
export { context };
