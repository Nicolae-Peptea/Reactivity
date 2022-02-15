using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Profiles
{
    public class PartialProfileValidator : AbstractValidator<PartialProfileDto>
    {
        public PartialProfileValidator()
        {
            RuleFor(x => x.DisplayName).NotEmpty();
        }
    }
}
