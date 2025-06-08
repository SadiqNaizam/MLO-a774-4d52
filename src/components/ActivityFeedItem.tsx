import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { formatDistanceToNowStrict } from 'date-fns'; // For relative time

interface Actor {
  name: string;
  avatarUrl?: string;
  href?: string; // Link to actor's profile
}

interface ActivityFeedItemProps {
  actor: Actor;
  action: string; // e.g., "commented on", "updated", "created"
  target?: {
    name: string;
    href?: string; // Link to the target
  };
  timestamp: Date | string;
  icon?: React.ReactNode; // e.g. <MessageSquare className="h-4 w-4" />
  content?: React.ReactNode; // Additional content like a comment text
  className?: string;
}

const ActivityFeedItem: React.FC<ActivityFeedItemProps> = ({
  actor,
  action,
  target,
  timestamp,
  icon,
  content,
  className,
}) => {
  console.log("Rendering ActivityFeedItem for actor:", actor.name, "Action:", action);

  const timeAgo = typeof timestamp === 'string' ? 
                  formatDistanceToNowStrict(new Date(timestamp), { addSuffix: true }) :
                  formatDistanceToNowStrict(timestamp, { addSuffix: true });

  const ActorLink: React.FC<{children: React.ReactNode}> = ({children}) => 
    actor.href ? <a href={actor.href} className="font-semibold text-primary hover:underline">{children}</a> : <span className="font-semibold">{children}</span>;
  
  const TargetLink: React.FC<{children: React.ReactNode}> = ({children}) =>
    target?.href ? <a href={target.href} className="font-semibold text-primary hover:underline">{children}</a> : <span className="font-semibold">{children}</span>;

  return (
    <div className={cn("flex items-start space-x-3 py-3", className)}>
      {icon ? (
        <div className="flex-shrink-0 pt-1 text-muted-foreground">{icon}</div>
      ) : (
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarImage src={actor.avatarUrl} alt={actor.name} />
          <AvatarFallback>{actor.name.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-sm text-muted-foreground">
          <ActorLink>{actor.name}</ActorLink>
          {' '}{action}{' '}
          {target && <TargetLink>{target.name}</TargetLink>}
          <span className="whitespace-nowrap text-xs"> • {timeAgo}</span>
        </p>
        {content && <div className="mt-1 text-sm text-foreground">{content}</div>}
      </div>
    </div>
  );
};

export default ActivityFeedItem;