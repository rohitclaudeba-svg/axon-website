/** Red asterisk appended to the label of a mandatory form field. */
export function RequiredMark() {
  return (
    <span className="text-red-600" aria-hidden="true">
      {" "}*
    </span>
  );
}
