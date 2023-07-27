type Props = {
  title: string;
  text: string;
};
export const SectionInfo = ({ title, text }: Props) => {
  return (
    <section className={"space-y-1"}>
      <h6 className={"pb-2 font-bold"}>{title}</h6>
      <p className={"whitespace-pre-wrap"}>{text}</p>
    </section>
  );
};
