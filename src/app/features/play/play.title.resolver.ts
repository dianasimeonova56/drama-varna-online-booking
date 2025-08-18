import { inject } from "@angular/core";
import { ActivatedRoute, ResolveFn, Router } from "@angular/router";

export const titleResolver: ResolveFn<string> = (route) => {
    const router = inject(Router);

    const currentName = router.getCurrentNavigation()?.extras?.state?.['playName'];

    return currentName;
}