using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Activities
{
    public class UpdateAttendence
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities
                    .Include(a => a.Attendees)
                    .ThenInclude(u => u.AppUser)
                    .FirstOrDefaultAsync(x => x.Id == request.Id);

                if (activity == null)
                {
                    return null;
                }

                var user = await _context.Users.FirstOrDefaultAsync(x =>
                    x.UserName == _userAccessor.GetUserName());

                if (user == null)
                {
                    return null;
                }

                var hostUserName = activity.Attendees.FirstOrDefault(x => x.IsHost)?.AppUser.UserName;

                var attendece = activity.Attendees.FirstOrDefault(x => x.AppUser.UserName == user.UserName);

                if (attendece != null && hostUserName == user.UserName)
                {
                    activity.IsCancelled = !activity.IsCancelled;
                }

                if (attendece != null && hostUserName != user.UserName)
                {
                    activity.Attendees.Remove(attendece);
                }

                if (attendece == null)
                {
                    attendece = new ActivityAttendee
                    {
                        AppUser = user,
                        Activity = activity,
                        IsHost = false,
                    };

                    activity.Attendees.Add(attendece);
                }

                var result = await _context.SaveChangesAsync() > 0;

                return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem udating attendence");
            }
        }
    }
}
