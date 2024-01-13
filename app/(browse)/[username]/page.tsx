interface UserPageProps {
  params: { username: string };
}

export default function UserPage({ params }: UserPageProps) {
  return <div>User: {params.username}</div>;
}
