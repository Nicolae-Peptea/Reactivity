using FluentValidation;

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
