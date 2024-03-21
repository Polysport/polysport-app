export function formatDate(datetime_str: string | number): string {
  // Step 1: Parse the input date string into a JavaScript Date object
  const dateObject = new Date(datetime_str);

  // Step 2: Extract individual date and time components
  const year = dateObject.getUTCFullYear();
  const month = String(dateObject.getUTCMonth() + 1).padStart(2, "0");
  const day = String(dateObject.getUTCDate()).padStart(2, "0");
  const hours = String(dateObject.getUTCHours()).padStart(2, "0");
  const minutes = String(dateObject.getUTCMinutes()).padStart(2, "0");

  // Step 3: Format the components in the desired output format
  // Using template literals to concatenate the components
  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;

  if (!datetime_str) return "";

  return formattedDate;
}
