// Copyright (C) 2021 Trevor Thalacker

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published
// by the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

import rateLimit from 'express-rate-limit'

const apiRateLimit = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 10, // Limit requests to 10
    message: {
        error: 'rateLimited',
        message: 'You have been rate limited. Please try again in 1 hour',
        status: 429,
    },
    statusCode: 429,
})

export default apiRateLimit
