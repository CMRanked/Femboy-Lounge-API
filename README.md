# Femboy Lounge API

## Overview

The Femboy Lounge API is a moderation API designed for managing warnings and heat levels for users in a community setting. It provides endpoints for warning users, removing warnings, checking warnings, adding heat, removing heat, and checking heat.

## Endpoints

### Warn a User
GET /warn?user=<user>

Warns a user and records the timestamp of the warning.

### Remove Warning
GET /removeWarn?user=<user>

Retrieves the list of warnings for a specific user.

### Add Heat to a User
GET /checkWarns?user=<user>

## The API will be accessible at http://apifemboylounge.uk.to/

## Contributing
If you'd like to contribute to the Femboy Lounge API, please follow the guidelines in CONTRIBUTING.md.

## License
This project is licensed under the MIT License - see the LICENSE.md file for details.
