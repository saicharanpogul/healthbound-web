import { JSDOM } from "jsdom";
import * as d3 from "d3";
import sharp from "sharp";

const textColor = "#1C4942";
const backgroundColor = "#43E0B3";

export const HBTFront = async (
  steps: number,
  kilometers: number,
  miles: number,
  stringDate: number,
  name: string
) => {
  try {
    const _date = new Date(stringDate);
    const formattedDate = `${_date.getDate()}/${_date.getMonth()}/${_date.getFullYear()}`;
    const minHtml = "<html><head></head><body></body></html>";
    const dom = new JSDOM(`${minHtml}`, { pretendToBeVisual: true });
    const window = dom.window;
    window.d3 = d3.select(window.document);

    const hbt = window.d3.select("body").append("svg").attr("id", "hbt");

    hbt
      .attr("viewBox", "0 0 1080 1080")
      .attr("xmlns", "http://www.w3.org/2000/svg")
      .attr("xmlns:xlink", "http://www.w3.org/1999/xlink")
      .attr("xmlns:svgjs", "http://svgjs.dev/svgjs");

    // background
    hbt
      .append("rect")
      .attr("width", 1080)
      .attr("height", 1080)
      .attr("fill", backgroundColor)
      .attr("rx", 10);

    // center steps
    const center = hbt.append("g");

    center
      .append("text")
      .attr("font-family", "Poppins")
      .attr("font-size", 128)
      .attr("font-weight", 600)
      .attr("x", "50%")
      .attr("y", "50%")
      .attr("text-anchor", "middle")
      .attr("fill", textColor)
      .text(steps);

    // steps text
    center
      .append("text")
      .attr("font-family", "Poppins")
      .attr("font-size", 56)
      .attr("font-weight", 500)
      .attr("x", "50%")
      .attr("y", "58%")
      .attr("text-anchor", "middle")
      .attr("fill", textColor)
      .text("Steps");

    // top step text
    hbt
      .append("text")
      .attr("font-family", "Poppins")
      .attr("font-size", 128)
      .attr("font-weight", 600)
      .attr("x", "50%")
      .attr("y", "4%")
      .attr("text-anchor", "middle")
      .attr("fill", textColor)
      .text("Steps");

    // left step text
    hbt
      .append("text")
      .attr("font-family", "Poppins")
      .attr("font-size", 128)
      .attr("font-weight", 600)
      .attr("x", "50%")
      .attr("dy", "10%")
      .attr("text-anchor", "middle")
      .attr("fill", textColor)
      .text("Steps")
      .attr("transform", "rotate(90 45 25)");

    // right step text
    hbt
      .append("text")
      .attr("font-family", "Poppins")
      .attr("font-size", 128)
      .attr("font-weight", 600)
      .attr("x", "50%")
      .attr("dy", "-90%")
      .attr("text-anchor", "middle")
      .attr("fill", textColor)
      .text("Steps")
      .attr("transform", "rotate(90 45 25)");

    // kms | mi.
    hbt
      .append("text")
      .attr("font-family", "Poppins")
      .attr("font-size", 32)
      .attr("font-weight", 500)
      .attr("x", "13%")
      .attr("y", "96%")
      .attr("text-anchor", "middle")
      .attr("fill", textColor)
      .text(`${kilometers} km | ${miles.toPrecision(2)} mi.`);

    // name
    hbt
      .append("text")
      .attr("font-family", "Poppins")
      .attr("font-size", 32)
      .attr("font-weight", 500)
      .attr("x", "50%")
      .attr("y", "96%")
      .attr("text-anchor", "middle")
      .attr("fill", textColor)
      .text(`${name}`);

    // date
    hbt
      .append("text")
      .attr("font-family", "Poppins")
      .attr("font-size", 32)
      .attr("font-weight", 500)
      .attr("x", "96%")
      .attr("y", "96%")
      .attr("text-anchor", "end")
      .attr("fill", textColor)
      .text(formattedDate);

    // line linear gradient
    const defs = hbt.append("defs");

    const gradient = defs
      .append("linearGradient")
      .attr("id", "line-gradient")
      .attr("x1", "0%")
      .attr("x2", "0%")
      .attr("y1", "0%")
      .attr("y2", "100%");

    gradient
      .append("stop")
      .attr("class", "start")
      .attr("offset", "0%")
      .attr("stop-color", textColor)
      .attr("stop-opacity", 1);

    gradient
      .append("stop")
      .attr("class", "end")
      .attr("offset", "100%")
      .attr("stop-color", backgroundColor)
      .attr("stop-opacity", 1);

    // top line
    hbt
      .append("line")
      .attr("x1", "10%")
      .attr("y1", "10%")
      .attr("x2", "90%")
      .attr("y2", "9.9%")
      .attr("stroke", textColor)
      .attr("fill", "none")
      .attr("stroke-width", 2);

    // left line
    hbt
      .append("line")
      .attr("x1", "10%")
      .attr("y1", "10%")
      .attr("x2", "9.9%")
      .attr("y2", "86%")
      .attr("stroke", 'url("#line-gradient")')
      .attr("fill", "none")
      .attr("stroke-width", 2);

    // right line
    hbt
      .append("line")
      .attr("x1", "90%")
      .attr("y1", "10%")
      .attr("x2", "89.9%")
      .attr("y2", "86%")
      .attr("stroke", 'url("#line-gradient")')
      .attr("fill", "none")
      .attr("stroke-width", 2);

    const svg = window.d3.select("body").html();
    const png = await sharp(Buffer.from(svg)).png().toBuffer();
    return { svg, png };
  } catch (error) {
    throw error;
  }
};

export const HBTBack = async (
  calories: string,
  address: string,
  datetime: number
) => {
  try {
    const _date = new Date(datetime);
    const formattedDate = `${_date.getDate()}/${_date.getMonth()}/${_date.getFullYear()}`;
    const minHtml = "<html><head></head><body></body></html>";
    const dom = new JSDOM(`${minHtml}`, { pretendToBeVisual: true });
    const window = dom.window;
    window.d3 = d3.select(window.document);

    const hbt = window.d3.select("body").append("svg").attr("id", "hbt");
    hbt
      .attr("viewBox", "0 0 1080 1080")
      .attr("xmlns", "http://www.w3.org/2000/svg")
      .attr("xmlns:xlink", "http://www.w3.org/1999/xlink")
      .attr("xmlns:svgjs", "http://svgjs.dev/svgjs");

    // background
    hbt
      .append("rect")
      .attr("width", 1080)
      .attr("height", 1080)
      .attr("fill", backgroundColor);

    // center steps
    const center = hbt.append("g");

    center
      .append("text")
      .attr("font-family", "Poppins")
      .attr("font-size", 128)
      .attr("font-weight", 600)
      .attr("x", "50%")
      .attr("y", "50%")
      .attr("text-anchor", "middle")
      .attr("fill", textColor)
      .text(calories);

    // center calories text
    center
      .append("text")
      .attr("font-family", "Poppins")
      .attr("font-size", 56)
      .attr("font-weight", 500)
      .attr("x", "50%")
      .attr("y", "58%")
      .attr("text-anchor", "middle")
      .attr("fill", textColor)
      .text("Calories 🔥");

    // top calories text
    hbt
      .append("text")
      .attr("font-family", "Poppins")
      .attr("font-size", 128)
      .attr("font-weight", 600)
      .attr("x", "50%")
      .attr("y", "5%")
      .attr("text-anchor", "middle")
      .attr("fill", textColor)
      .text("Calories");

    // left calories text
    hbt
      .append("text")
      .attr("font-family", "Poppins")
      .attr("font-size", 128)
      .attr("font-weight", 600)
      .attr("x", "50%")
      .attr("dy", "10%")
      .attr("text-anchor", "middle")
      .attr("fill", textColor)
      .text("Calories")
      .attr("transform", "rotate(90 45 25)");

    // right calories text
    hbt
      .append("text")
      .attr("font-family", "Poppins")
      .attr("font-size", 128)
      .attr("font-weight", 600)
      .attr("x", "50%")
      .attr("dy", "-88%")
      .attr("text-anchor", "middle")
      .attr("fill", textColor)
      .text("Calories")
      .attr("transform", "rotate(90 45 25)");

    // address
    hbt
      .append("text")
      .attr("font-family", "Poppins")
      .attr("font-size", 32)
      .attr("font-weight", 500)
      .attr("x", "4%")
      .attr("y", "96%")
      .attr("text-anchor", "start")
      .attr("fill", textColor)
      .text(`${address}`);

    // date
    hbt
      .append("text")
      .attr("font-family", "Poppins")
      .attr("font-size", 32)
      .attr("font-weight", 500)
      .attr("x", "96%")
      .attr("y", "96%")
      .attr("text-anchor", "end")
      .attr("fill", textColor)
      .text(formattedDate);

    // line linear gradient
    const defs = hbt.append("defs");

    const gradient = defs
      .append("linearGradient")
      .attr("id", "line-gradient")
      .attr("x1", "0%")
      .attr("x2", "0%")
      .attr("y1", "0%")
      .attr("y2", "100%");

    gradient
      .append("stop")
      .attr("class", "start")
      .attr("offset", "0%")
      .attr("stop-color", textColor)
      .attr("stop-opacity", 1);

    gradient
      .append("stop")
      .attr("class", "end")
      .attr("offset", "100%")
      .attr("stop-color", backgroundColor)
      .attr("stop-opacity", 1);

    // top line
    hbt
      .append("line")
      .attr("x1", "10%")
      .attr("y1", "10%")
      .attr("x2", "90%")
      .attr("y2", "9.9%")
      .attr("stroke", textColor)
      .attr("fill", "none")
      .attr("stroke-width", 2);

    // left line
    hbt
      .append("line")
      .attr("x1", "10%")
      .attr("y1", "10%")
      .attr("x2", "9.9%")
      .attr("y2", "86%")
      .attr("stroke", 'url("#line-gradient")')
      .attr("fill", "none")
      .attr("stroke-width", 2);

    // right line
    hbt
      .append("line")
      .attr("x1", "90%")
      .attr("y1", "10%")
      .attr("x2", "89.9%")
      .attr("y2", "86%")
      .attr("stroke", 'url("#line-gradient")')
      .attr("fill", "none")
      .attr("stroke-width", 2);

    const svg = window.d3.select("body").html();
    const png = await sharp(Buffer.from(svg)).png().toBuffer();
    return { svg, png };
  } catch (error) {
    throw error;
  }
};
