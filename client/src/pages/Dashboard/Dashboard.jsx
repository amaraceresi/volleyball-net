import Page from "../../components/Page";

const headContent = (
  <>
    <title>Dashboard</title>
    <meta name="description" content="This is my personalized homepage." />
  </>
);

export default function Dashboard() {
  return (
    <Page isProtected={true} headContent={headContent}>
      <div>Dashboard</div>
    </Page>
  );
}