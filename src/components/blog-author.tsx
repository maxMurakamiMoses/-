import { formatDate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function Author({
  name,
  image,
  twitterUsername,
  updatedAt,
  imageOnly,
  className = "",
  disableLink = false,
}: {
  name: string;
  image: string;
  twitterUsername: string;
  updatedAt?: string;
  imageOnly?: boolean;
  className?: string;
  disableLink?: boolean;
}) {
  if (imageOnly) {
    return (
      <Image
        src={image}
        alt={name}
        width={36}
        height={36}
        className={`rounded-full aspect-square object-cover transition-all group-hover:brightness-90 ${className}`}
      />
    );
  }

  if (updatedAt) {
    return (
      <div className={`flex items-center space-x-3 ${className}`}>
        <Image
          src={image}
          alt={name}
          width={36}
          height={36}
          className="rounded-full aspect-square object-cover"
        />
        <div className="flex flex-col">
          <p className="text-sm text-muted-foreground">Written by {name}</p>
          <time
            dateTime={updatedAt}
            className="text-sm font-light text-muted-foreground/70"
          >
            Last updated {formatDate(updatedAt)}
          </time>
        </div>
      </div>
    );
  }

  // If no Twitter username or it's 'anonymous', render as link to author page
  if (!twitterUsername || twitterUsername === 'anonymous') {
    if (disableLink) {
      return (
        <div className={`group flex items-center space-x-3 ${className}`}>
          <Image
            src={image}
            alt={name}
            width={40}
            height={40}
            className={`rounded-full aspect-square object-cover transition-all group-hover:brightness-90 ${className}`}
          />
          <div className="flex flex-col">
            <p className="font-semibold text-foreground">{name}</p>
            <p className="text-sm text-muted-foreground">Author</p>
          </div>
        </div>
      );
    }
    return (
      <Link
        href={`/author/${encodeURIComponent(name)}`}
        className={`group flex items-center space-x-3 ${className} hover:opacity-80 transition-opacity cursor-pointer`}
      >
        <Image
          src={image}
          alt={name}
          width={40}
          height={40}
          className={`rounded-full aspect-square object-cover transition-all group-hover:brightness-90 ${className}`}
        />
        <div className="flex flex-col">
          <p className="font-semibold text-foreground">{name}</p>
          <p className="text-sm text-muted-foreground">Author</p>
        </div>
      </Link>
    );
  }

  // Clean the Twitter username by removing @ if it exists
  const cleanTwitterUsername = twitterUsername.startsWith('@') 
    ? twitterUsername.slice(1) 
    : twitterUsername;

  if (disableLink) {
    return (
      <div className={`group flex items-center space-x-3 ${className}`}>
        <Image
          src={image}
          alt={name}
          width={40}
          height={40}
          className={`rounded-full aspect-square object-cover transition-all group-hover:brightness-90 ${className}`}
        />
        <div className="flex flex-col">
          <p className="font-semibold text-foreground">{name}</p>
          <p className="text-sm text-muted-foreground">@{cleanTwitterUsername}</p>
        </div>
      </div>
    );
  }

  return (
    <Link
      href={`/author/${encodeURIComponent(name)}`}
      className={`group flex items-center space-x-3 ${className} hover:opacity-80 transition-opacity cursor-pointer`}
    >
      <Image
        src={image}
        alt={name}
        width={40}
        height={40}
        className={`rounded-full aspect-square object-cover transition-all group-hover:brightness-90 ${className}`}
      />
      <div className="flex flex-col">
        <p className="font-semibold text-foreground">{name}</p>
        <p className="text-sm text-muted-foreground">@{cleanTwitterUsername}</p>
      </div>
    </Link>
  );
}
