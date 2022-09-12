export function toLowercaseString(input: string): string {
  if (typeof input !== "string") {
    console.log({ error: "input not a string" });
    return "";
  }

  const length = input.length;
  let temp: string = "";
  for (let i = 0; i < length; i++) {
    temp = temp.concat(input[i].toLocaleLowerCase());
  }
  return temp;
}
