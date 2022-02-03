# Aker

## Overview

Aker is a player managment system designed for use in whitelisted Minecraft servers. Aker provides a portal for players to sign up and apply for a server's whitelist, whilst server moderators and administrators get a control panel to automatically add approved players onto the server whitelist without the need of accessing the console or additional software.

## Features

- Discord based authentication
- Whitelist application tracking
- Automatically add approved players to whitelist
- Admin panel for manually adding and removing players from whitelist

## Deployment

Aker uses Redis (in conjunction with BungeeSafeGuard/RedisBSG) for interactive with the server whitelist, and MySQL/MariaDB for managing users accounts and whitelist applications. As such, Aker can be deployed using Docker and serverless architectures.

### Prerequisites

- Minecraft Server:
  - BungeeSafeGuard/RedisBungee
- Redis srver
- MySQL/MariaDB
- Discord Application (for authenticating players)

#### Serverless deployment notes

If you are deploying Aker on a serverless cloud service, ensure that it allows NextJS API routes. Vercel is known to work really well in this case. For SQL and Redis databases, PlanetScale and RedisLabs has been verified to work well

## Development

To run a local dev build, simply clone this repo and run `yarn` followed by `yarn dev`.
